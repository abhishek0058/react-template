import React from "react";
import { Table, Button, Image } from 'semantic-ui-react'

class ShowRecords extends React.Component {
  render () {
    const { records = [] } = this.props;
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>S no.</Table.HeaderCell>
            <Table.HeaderCell>Channel Name</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Play audio</Table.HeaderCell>
            <Table.HeaderCell>Embed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            records.map((record, index) => <Row record={record} key={index+"row"} index={index} />)
          }
        </Table.Body>
      </Table>
    )
  }
}

function Row ({ record, index }) {
  const { 
    channel: { title: channelName, urls: { logo_image: { original } } },
    title: mainTitle,
    urls: { high_mp3 },
    can_embed = false
  } = record;

  return (
    <Table.Row>
      <Table.Cell>{index+1}</Table.Cell>
      <Table.Cell>
        <Image src={original} avatar />
        {channelName}
      </Table.Cell>
      <Table.Cell>{mainTitle}</Table.Cell>
      <Table.Cell>
        {/* <audio controls>
          <source src={high_mp3} type="audio/mpeg" />
        </audio> */}
      </Table.Cell>
      <Table.Cell>
        {can_embed ? (<Button color="yellow">Embed</Button>) : null}
      </Table.Cell>
    </Table.Row>
  );
}

export default ShowRecords;