import React, {Component } from 'react';
import Particles from 'react-particles-js';
import logo from '../images_proj/home_backg.jpeg';

class Home extends Component{
    render()
    {
        return(
            <div>
                <Particles 
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
                                blur: 10,
                                value_area: 800
            				}
            			}
            		}
            	}}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${logo})` 
              }}
            />
            </div>

        )
    }
}

export default Home