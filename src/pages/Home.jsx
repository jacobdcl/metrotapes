import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { client } from '../lib/sanity'
import ProjectGrid from '../components/ProjectGrid'

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
    
    &.active {
      font-weight: bold;
      border-bottom: 2px solid black;
    }
  }
`

export default function Home() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const query = `*[_type == "project"] {
      _id,
      title,
      slug,
      mainImage,
      category
    }`

    client.fetch(query).then(data => {
      setProjects(data)
    })
  }, [])

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)

  return (
    <div>
      <FilterButtons>
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'photography' ? 'active' : ''}
          onClick={() => setFilter('photography')}
        >
          Photography
        </button>
        <button
          className={filter === 'videography' ? 'active' : ''}
          onClick={() => setFilter('videography')}
        >
          Videography
        </button>
      </FilterButtons>
      <ProjectGrid projects={filteredProjects} />
    </div>
  )
}