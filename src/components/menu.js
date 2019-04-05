import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import {
  Button,
  MenuItem,
  Menu
} from '@material-ui/core';

import '../styles/menu.css'

class MenuBar extends Component {
    state = {
        anchorEl: null
    }


    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleMenuClose = () => {
        this.setState({ anchorEl: null });
      };


    render(){
        return(
            <div>
              <div className='icon'>
        <Button
          aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
          style={{minWidth: '40px', color:'white' }}
        >
          <i class="fas fa-bars"></i>
        </Button>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}><Link to={this.props.page1}>{this.props.button1}</Link></MenuItem>
          <MenuItem onClick={this.handleMenuClose}><Link to={this.props.page2}>{this.props.button2}</Link></MenuItem>
        </Menu>
      </div>
        )
    }
}

export default MenuBar