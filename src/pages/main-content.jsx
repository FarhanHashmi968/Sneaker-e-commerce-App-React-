import { useEffect, useState } from 'react'
import { imgData } from '../Imagedata'
import ThumbnailLargeDisplay from './thumbnail-large-display'

const liContents = ['Collections', 'Men', 'Women', 'About', 'Contact']

const Main = () => {
  let [count, setCount] = useState(0)
  let [isVisible, setisVisible] = useState(false)
  let [isThumbnail, setIsThumbnail] = useState(false)
  let [image, setImage] = useState(null)

  if (isVisible) {
    const overlay = document.querySelector('.overlay')
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape' && !overlay.classList.contains('hidden')) {
        overlay.classList.add('hidden')
        setisVisible(false)
      }
    })
  }

  useEffect(() => {
    const cartNotification = document.querySelector('.cartNotification')
    cartNotification.style.display = 'block'
  }, [])

  const showCartNotification = () => {
    const cartNotification = document.querySelector('.cartNotification')
    cartNotification.innerText = count
  }

  function showCart() {
    setisVisible(true)
    const overlay = document.querySelector('.overlay')
    overlay.classList.remove('hidden')
  }

  function handleBlur(e) {
    if (isVisible) {
      e.target.classList.add('hidden')
      setisVisible(false)
    }
  }

  function showLargeImg(e) {
    setImage(e.target.src)
    setIsThumbnail(true)
    const overlay = document.querySelector('.overlay')
    overlay.classList.remove('hidden')
  }

  function closeThumbnailImage() {
    setIsThumbnail(false)
    const overlay = document.querySelector('.overlay')
    overlay.classList.add('hidden')
  }

  return (
    <>
      <header>
        <nav>
          <div className='menuBar'>
            <img
              src={'/images/icon-menu.svg'}
              alt=''
              className='menuIcon'
              onClick={() => {
                document.querySelector('.navCart').classList.add('showCard')
              }}
            />
          </div>
          <div className='contentPart'>
            <img src={'images/logo.svg'} alt='' />
            <ul>
              {liContents.map((li, index) => (
                <li key={index}>{li}</li>
              ))}
            </ul>
          </div>
          <div className='userPart'>
            <img
              src={'images/icon-cart.svg'}
              alt=''
              className='cartImg'
              onClick={showCart}
            />
            <p className='cartNotification'>0</p>
            <div className='exitCardContainer'>
              {isVisible && (
                <div>
                  {count == 0 ? (
                    <div className='exitCard'>
                      <div className='cartheading'>Cart</div>
                      <p className='emptyClass'>Your card is empty</p>
                    </div>
                  ) : (
                    <div className='exitCard'>
                      <div className='cartheading'>Cart</div>
                      <div className='productDetail'>
                        <img
                          src='/images/image-product-1-thumbnail.jpg'
                          alt='imageLogo'
                          className='imgproduct'
                        />
                        <div>
                          <p>Fall Limited Edition Sneakers</p>
                          <p>
                            $125.00 *{' '}
                            <span className='quantityNo'>{count}</span>{' '}
                            <span className='totalCost'>${125 * count}.00</span>
                          </p>
                        </div>
                        <img
                          src='/images/icon-delete.svg'
                          alt=''
                          onClick={() => {
                            setCount(0)
                            document.querySelector(
                              '.cartNotification'
                            ).innerHTML = 0
                          }}
                        />

                        {count == 0 && (
                          <div className='exitCardContainer'>
                            <div className='exitCard'>
                              <div className='cartheading'>Cart</div>
                              <p className='emptyClass'>Your card is empty</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <button>Checkout</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <img src={'images/image-avatar.png'} alt='' className='userImg' />
          </div>
        </nav>
      </header>
      <main>
        <div className='imagePart'>
          <div className='fg'>
            <div className='mainImage'>
              <img
                src={'/images//image-product-1.jpg'}
                alt='image product 1'
                className='mainImg'
              />
            </div>
            <div className='thumbnailImg'>
              {imgData.map((image, index) => {
                return (
                  <img src={image} alt='' key={index} onClick={showLargeImg} />
                )
              })}
            </div>
          </div>
        </div>
        <div className='descriptionPart'>
          <p className='logoName'>SNEAKER COMPANY</p>
          <h2>Fall Limited Edition Sneakers</h2>
          <p className='description'>
            These low-profile sneakers are your perfect casual wear companinion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>
          <div className='rupeesSection'>
            <span className='rupees'>$125.00</span>
            <span className='discountPercentage'>50%</span>
          </div>
          <p className='actualRupees'>$250.00</p>
          <div className='exitSection'>
            <div className='bar'>
              <span
                className='sign'
                onClick={() => {
                  if (count <= 0) {
                    setCount(0)
                  } else {
                    count = count - 1
                    setCount(count)
                  }
                }}
              >
                -
              </span>
              <span className='itemQuantity'>{count}</span>
              <span
                className='sign'
                onClick={() => {
                  count = count + 1
                  setCount(count)
                }}
              >
                +
              </span>
            </div>
            <div className='addButton' onClick={showCartNotification}>
              <img src={'/images//icon-cart.svg'} alt='' /> Add to cart
            </div>
          </div>
        </div>

        <div className='overlay hidden' onClick={handleBlur}></div>

        <div className='imageTodisplay'>
          {isThumbnail && (
            <ThumbnailLargeDisplay
              src={image}
              setIsThumbnail={setIsThumbnail}
              closeThumbnailImage={closeThumbnailImage}
            />
          )}
        </div>

        <div className='navCart'>
          <img
            src={'/images//icon-close.svg'}
            alt=''
            className='closeNav'
            onClick={() => {
              document.querySelector('.navCart').classList.remove('showCard')
            }}
          />
          <ul>
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='nextPreviousdiv'>
          <img
            src={'/images/icon-previous.svg'}
            alt=''
            className='previousImage'
            onClick={() => {
              const mainImg = document.querySelector('.mainImg')
              let actualImage = mainImg.src
              let slicedUrl = actualImage.slice(-28)
              let currIndex = imgData.indexOf(slicedUrl)
              if (currIndex === 0) {
                mainImg.src = imgData[3]
              } else {
                mainImg.src = imgData[currIndex - 1]
              }
            }}
          />
          <img
            src={'/images/icon-next.svg'}
            alt=''
            className='nextImage'
            onClick={() => {
              const mainImg = document.querySelector('.mainImg')
              let actualImage = mainImg.src
              let slicedUrl = actualImage.slice(-28)
              let currIndex = imgData.indexOf(slicedUrl)
              if (currIndex === 3) {
                mainImg.src = imgData[0]
              } else {
                mainImg.src = imgData[currIndex + 1]
              }
            }}
          />
        </div>
      </main>
    </>
  )
}
export default Main
