import React, { Component } from "react";
import { Header, Container, Divider, Grid, Input } from 'semantic-ui-react'
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
      },
      showItemsCount: 10,
      search: ""
    }
  }

  async componentDidMount () {
    const data = await Get("https://api.audioboom.com/channels/4973631/audio_clips");
    if (data && data.body && data.body.audio_clips) {
      this.setState({ records: data.body.audio_clips, recordsToShow: data.body.audio_clips });
    }
    else {
      this.setState({ error: { status: true, text: "Error fetching data" } });
    }
  }

  render () {
    
    const { error: { status: errorStatus, text }, recordsToShow, showItemsCount, search } = this.state;
    
    return (
      <Container>
        <Header as="h1">PodCost</Header>
        <Divider></Divider>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                Show 
                <Input 
                  style={{ width: 100, marginLeft: 10, marginRight: 10 }} 
                  value={showItemsCount} 
                  onChange={e => this.setState({ showItemsCount: e.target.value}, () => this._filterRecords())}  
                />
                enteries
              </Grid.Column>
              <Grid.Column width={6} textAlign="right">
                Search
                <Input 
                  icon='search' 
                  placeholder='Search' 
                  style={{ marginLeft: 10, marginRight: 10 }} 
                  value={search} 
                  onChange={e => this.setState({ search: e.target.value}, () => this._filterRecords())}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {errorStatus ? <Header as="h3">{text}</Header>:<ShowRecords records={recordsToShow} />}
        </Container>
      </Container>
    )
  }

  _filterRecords = () => {
    const { search: searchToken, records, showItemsCount } = this.state;
    
    const recordsToShow = records.filter(record => {
      const { channel: { title: channelName }, title: mainTitle } = record;
      if (channelName.includes(searchToken) || mainTitle.includes(searchToken)) {
        return true;
      }
      return false;
    });

    this.setState({ recordsToShow: recordsToShow.slice(0, showItemsCount) });
  }

}

export default PodCost;