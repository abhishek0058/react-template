import React, { Component } from "react";
import { Header, Container, Divider } from 'semantic-ui-react'
import { Get } from "../services";
import { ShowRecords } from "./index";

class PodCost extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
      error: {
        status: false,
        text: ""
      }
    }
  }

  async componentDidMount () {
    const data = await Get("https://api.audioboom.com/channels/4973631/audio_clips");
    if (data && data.body && data.body.audio_clips) {
      this.setState({ records: data.body.audio_clips });
    }
    else {
      this.setState({ error: { status: true, text: "Error fetching data" } });
    }
  }

  render () {
    const { error: { status: errorStatus, text }, records } = this.state;
    return (
      <Container>
        <Header as="h1">PodCost</Header>
        <Divider></Divider>
        <Container>
          {errorStatus ? <Header as="h3">{text}</Header>:<ShowRecords records={records} />}
        </Container>
      </Container>
    )
  }
}

export default PodCost;