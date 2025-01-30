import styled from 'styled-components'
import { urlFor } from '../lib/sanity'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`

const ProjectCard = styled.div`
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.02);
    }
  }
`

export default function ProjectGrid({ projects }) {
  return (
    <Grid>
      {projects?.map((project) => (
        <ProjectCard key={project._id}>
          <a href={`/project/${project.slug.current}`}>
            <img 
              src={urlFor(project.mainImage).width(600).url()} 
              alt={project.title} 
            />
          </a>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </ProjectCard>
      ))}
    </Grid>
  )
} 