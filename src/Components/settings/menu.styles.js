import styled from "styled-components";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 24vw;
  text-align: left;
  padding-top: 2%;
  padding-right: 2.5%;
  padding-left: 2.5%;
  background: rgba(241, 249, 255, 0.9);
  position: absolute;
  top: 0;
  right: 0;
  // transform: ${({ hide }) => (hide ? "translateX(+100%)" : "translateX(0)")};
  // transition: transform 0.3s ease-in-out;
  z-index : 1000000;
  font-size: 4.5vmin;

  h4 {
    font-size: 2vw;
    color: #828b93;
  }

  #firstLine {
    width: 100%;
    height: 2px
    margin-left: 2.5%;
    margin-right: 2.5%;
    margin-top: 5%;
    border-style: inset;
  }

  #secondLine {
    width: 100%;
    height: 2px
    margin-left: 2.5%;
    margin-right: 2.5%;
    margin-top: 8%;
    margin-bottom: 2%;
    border-style: inset;
  }

  #thirdLine {
    width: 100%;
    height: 2px
    margin-left: 2.5%;
    margin-right: 2.5%;
    margin-top: 8%;
    margin-bottom: 2%;
    border-style: inset;
  }

  form {
      height: 80vh;
  }

  .countdown-label {
    font-size: 50%;
  }

  .repeatNum{
    height: 3vmin;
    width: 3vmin;
    font-size: 1vmin;
    color: #779da6;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 2.5vmin;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    background-color: rgba(255,255,255,0.5);
    outline: none;
    text-align: right;
  }

  .inputBox{
    margin: auto;
    justify-content: center;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #aaa;
    width: 18vmin;
    height: 4vmin;
    padding-top: 2%;
    margin-top: 6%;
    margin-bottom: 3%
  }

  .soundLabel{
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 50%;
    color: #779da6;
    margin-top: 5%;
    margin-right: 20%;
    width: 80%;
    text-align: left;

}
  
label {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #779da6;
  margin-top: 1%;
  margin-bottom: 1%;
  

}

.num-repeats-div {
  margin-top: 5%;
}

.soundSetting {
    display: flex;
    flex-direction: row;
    /*justify-content: center;*/
    align-items: center;
}

.toggle-padding{
  padding-top: 9%;
}
  `;

export default StyledMenu;
