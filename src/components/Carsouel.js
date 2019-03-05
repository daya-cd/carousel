import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getData,updatelike} from '../js/actions/index'

class Carsouel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translateValue: 0,
            currentIndex: 0,
        };

        this.goToNext=this.goToNext.bind(this);
        this.goToPrevSlide=this.goToPrevSlide.bind(this);
    }

    componentWillMount()
    {
        // To fetch data from store

        this.props.getData();
        
    }
    goToPrevSlide = () => {

        if(this.state.currentIndex === 0)
          return;
        
        this.setState(prevState => ({
          currentIndex: prevState.currentIndex - 1,
          translateValue: prevState.translateValue + this.slideWidth()
        }))
      }
    

    goToNext(event)
    {
    
        if(this.state.currentIndex === this.props.items.length - 1) {
            return this.setState({
              currentIndex: 0,
              translateValue: 0
            })
          }
          
              
            this.setState(prevState => ({
                currentIndex: prevState.currentIndex + 1,
                translateValue: prevState.translateValue + -(this.slideWidth())
              })); 
         
    }


    // Calculate inner width of the single slide.
    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
     }
     
    toggleLike(e,value,index)
     {
         e.preventDefault();
        //  const toogleLike =!value;
         this.props.updatelike({index,value});

     }
   
  render() {

    // Get items array from state.

    let items=this.props.items;
    
    return (
      <section>
      <div className="container">
          <div className="row slider-wrapper" style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          {items.map((item,index) => (
          
            <div className="col-4 slide" key={item.id}>
             <a href={item.href} className="card" target="_blank">
                  <img className="figure" src={item.image_url}></img>
                     
                      <article>
                          <div className="heading">
                              <img src={item.image_url} />
                              <h2>
                                  {item.title}
                                  <div>{item.subtitle}</div>
                              </h2>
                          </div>
                          <div className="snippet">
                              <p dangerouslySetInnerHTML={{ __html: item.text }} >
                              </p> 
                              <p className="heart" onClick={(e) => {this.toggleLike(e, item.is_liked,index)}}>
                              <i className={"fa " + (item.is_liked ? 'fa-heart' : 'fa-heart-o')}></i>                                
                              </p>
                          </div>
                      </article>
                  </a>

            </div>))}
              
          </div>
          
      </div>
      <div className="controls">
              <div className="controls-wrap">
                  <a href="#" onClick={this.goToPrevSlide}><span className="chevron left"></span></a>
                  <a href="#" onClick={this.goToNext}><span className="chevron right"></span></a>
              </div>
          </div>
  </section>
    )
  }
}

const mapStateToProps=state=>({
   items:state.items
});



Carsouel.propTypes={
    updatelike:PropTypes.func.isRequired
}




export default connect(mapStateToProps,{updatelike,getData})(Carsouel);
