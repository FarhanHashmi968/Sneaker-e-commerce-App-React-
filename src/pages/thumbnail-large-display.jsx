import { imgData } from '../Imagedata'

const ThumbnailLargeDisplay = ({
  src,
  setIsThumbnail,
  closeThumbnailImage,
}) => {
  function handlenext() {
    const mainImageimagePart = document.querySelector('.mainImageimagePart')

    let actualImage = mainImageimagePart.src
    let slicedUrl = actualImage.slice(-28)
    let currIndex = imgData.indexOf(slicedUrl)
    if (currIndex === 3) {
      mainImageimagePart.src = imgData[0]
    } else {
      mainImageimagePart.src = imgData[currIndex + 1]
    }
  }

  function handleprevious() {
    const mainImageimagePart = document.querySelector('.mainImageimagePart')

    let actualImage = mainImageimagePart.src
    let slicedUrl = actualImage.slice(-28)
    let currIndex = imgData.indexOf(slicedUrl)
    if (currIndex === 0) {
      mainImageimagePart.src = imgData[3]
    } else {
      mainImageimagePart.src = imgData[currIndex - 1]
    }
  }

  function thumbnailInlarge(e) {
    const mainImageimagePart = document.querySelector('.mainImageimagePart')
    mainImageimagePart.src = e.target.src
  }

  return (
    <>
      <div className='imagePartDisplay'>
        <img
          src={'images//icon-close.svg'}
          alt=''
          className='iconClose'
          onClick={closeThumbnailImage}
        />
        <img
          src={'images//icon-previous.svg'}
          alt=''
          className='iconPrevious'
          onClick={handleprevious}
        />
        <img
          src={'images//icon-next.svg'}
          alt=''
          className='iconNext'
          onClick={handlenext}
        />
        <div className='fgDisplay'>
          <div className='mainImage'>
            <img src={src} className='mainImageimagePart' />
          </div>
          <div className='thumbnailImgDisplay' onClick={thumbnailInlarge}>
            {imgData.map((img, index) => (
              <img src={img} alt='' key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default ThumbnailLargeDisplay
