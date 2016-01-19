import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../action-creators';

class Session extends React.Component {
  componentWillMount() {
    this.props.dispatch(actionCreators.getSessions());
  }

  render() {
    return (
      <div className='starter-template'>
        <div className='page-header'>
          <h1>Lean Coffee Sessions</h1>
        </div>
        <div style={{paddingBottom: '10px'}}>
          <div style={{textAlign: 'right'}}>
            <Button bsSize='md' bsStyle='success' >
              Create New Session
            </Button>
          </div>
        </div>
        <div className = 'session-list'>
          <table>
            <tbody>
            {
              this.props.sessions && this.props.sessions.map((s,i) => {
                return (
                  <tr key={i}>
                    <td> {i + 1}. {s.title} </td>
                  </tr>);
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    frozen: state._session.frozen,
    sessions: state._session.sessions
  };
};

export default connect(mapStateToProps)(Session);
