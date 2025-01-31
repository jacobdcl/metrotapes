import { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { urlFor } from '../lib/sanity'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`

const Button = styled.button`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1001;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`

const CloseButton = styled(Button)`
  top: 20px;
  right: 20px;
`

const NavButton = styled(Button)`
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    ${props => props.$direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
  }
`

export default function ImageModal({ isOpen, onClose, currentImage, mediaItems }) {
    const currentIndex = mediaItems?.findIndex(item =>
        item.type === 'image' && item.image?.asset?._ref === currentImage?.asset?._ref
    ) ?? -1

    const handlePrevious = useCallback(() => {
        if (!mediaItems) return
        let newIndex = currentIndex
        do {
            newIndex = (newIndex - 1 + mediaItems.length) % mediaItems.length
        } while (newIndex !== currentIndex && mediaItems[newIndex].type !== 'image')

        if (newIndex !== currentIndex && mediaItems[newIndex].type === 'image') {
            onImageChange(mediaItems[newIndex].image)
        }
    }, [currentIndex, mediaItems])

    const handleNext = useCallback(() => {
        if (!mediaItems) return
        let newIndex = currentIndex
        do {
            newIndex = (newIndex + 1) % mediaItems.length
        } while (newIndex !== currentIndex && mediaItems[newIndex].type !== 'image')

        if (newIndex !== currentIndex && mediaItems[newIndex].type === 'image') {
            onImageChange(mediaItems[newIndex].image)
        }
    }, [currentIndex, mediaItems])

    const onImageChange = useCallback((image) => {
        onClose(image)
    }, [onClose])

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return

        switch (e.key) {
            case 'Escape':
                onClose()
                break
            case 'ArrowLeft':
                handlePrevious()
                break
            case 'ArrowRight':
                handleNext()
                break
            default:
                break
        }
    }, [isOpen, onClose, handlePrevious, handleNext])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!currentImage || !mediaItems) return null

    const imageUrl = urlFor(currentImage).width(1200).url()

    return (
        <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
            <ModalContent>
                <CloseButton onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </CloseButton>
                <NavButton $direction="prev" onClick={handlePrevious}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </NavButton>
                <ModalImage src={imageUrl} alt="" />
                <NavButton $direction="next" onClick={handleNext}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </NavButton>
            </ModalContent>
        </Overlay>
    )
}

ImageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentImage: PropTypes.shape({
        asset: PropTypes.shape({
            _ref: PropTypes.string
        })
    }),
    mediaItems: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        image: PropTypes.shape({
            asset: PropTypes.shape({
                _ref: PropTypes.string
            })
        }),
        alt: PropTypes.string
    }))
} 