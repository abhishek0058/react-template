import React, { Component } from "react";
import { Header, Container, Divider } from 'semantic-ui-react'
import { Get } from "../services";

class PodCost extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: []
    }
  }

  async componentDidMount () {
    const data = await Get("https://api.audioboom.com/channels/4973631/audio_clips");
    console.log("data", data);
  }

  render () {
    return (
      <Container>
        <Header as="h1">PodCost</Header>
        <Divider></Divider>
        <Container>
          Hsnndjn
        </Container>
      </Container>
    )
  }
}

export default PodCost;