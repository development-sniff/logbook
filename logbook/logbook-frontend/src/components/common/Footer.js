import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';

// 높이 약 238px;
const FooterBlock = styled.div`
  position : relative;
  bottom : 0;
  padding : 25px 0;
  color : #333;
  background-color : #dee2e6;
  margin : 0;

  .container {
    padding-left : 20px;
    padding-right : 20px;
  }

  h3 {
    margin : 0;
    font-weight:bold;
    font-size:16px;
  }

  ul {
  padding:0;
  list-style:none;
  line-height:1.6;
  font-size:14px;
  margin-bottom:0;
  }

.copyright {
  text-align:center;
  padding-top:24px;
  opacity:0.3;
  font-size:13px;
  margin-bottom:0;
}
`;

const Footer = () => {
  return (
    <FooterBlock>
	  <footer>
        <div class="container">
          <div className="information">
            <h3>LogBook</h3>
            <ul>
              <li>Email : castberry10@gmail.com</li>
              <li>Phone No : 010-1234-1234</li>
              <li>Address : 서울특별시 </li>
            </ul>
          </div>
          <div class="socialMedia">
            <a href="https://www.google.com/"><i class="kakaoTalk"></i></a>
            <a href="https://www.google.com/"><i class="facebook"></i></a>
            <a href="https://www.google.com/"><i class="instagram"></i></a>
            <a href="https://www.google.com/"><i class="youtube"></i></a>
          </div>
          <div class="copyright">LogBook © 2024</div>
        </div>
      </footer>
	 </FooterBlock>
  );
};

export default Footer;
