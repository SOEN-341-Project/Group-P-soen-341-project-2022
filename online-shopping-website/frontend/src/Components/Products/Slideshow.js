import * as React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from "react-slideshow-image";
import {Link} from "react-router-dom";

const ProductShow = (props) => {
  return (
    <Link to={{
      pathname: `/${props.product.id}/${props.product.name}`,
      params: { props }
    }} className="RoutingLink">
      <div className="each-slide">
        <div>
          <div className="CenteringProductDetails">
            <div className="ProductDetailsShow">
              <img className="ProductImageShow" src={props.product.picture} alt={props.product.name}/>
              <div>
                <h3 className="ProductInfoSlide">{props.product.name}</h3>
                <p className="ProductInfoSlide">Brand: {props.product.brand.name}</p>
                <p className="ProductInfoSlide">Sold by: {props.product.seller.sellerName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const iterateProducts = (data) => {
  return data.products.map(product => {
    return (
      <ProductShow key={product.id} product={product} />
    );
  });
}

export const Slideshow = (props) => {
  return (
    <div className="SlideshowPadding">
      <h1 className="PromotedItems">SPECIAL!</h1>
      <Slide easing="ease">
        {iterateProducts(props)}
      </Slide>
    </div>
  )
}