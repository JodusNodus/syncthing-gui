import { PropTypes, Component } from 'react'
import h from 'react-hyperscript'
import { connect } from 'react-redux'
import randomString from 'randomstring'

import FolderEdit from '../../containers/FolderEdit'
import { clearFolderRejected } from '../../../main/actions/folder-rejected'

class FolderAdd extends Component {
  componentWillUnmount(){
    if(this.props.folderRejected.accepted){
      this.props.clearFolderRejected()
    }
  }
  render(){
    const {
      onSubmit,
      myID,
      folderRejected: {
        accepted,
        folder,
        device,
        folderLabel,
      },
    } = this.props

    const randomID = randomString.generate(10)

    const formattedRandomID = [
      randomID.slice(0, 5),
      randomID.slice(5),
    ].join('-')

    const initialValues = {
      id: accepted ? folder : formattedRandomID,
      label: accepted ? folderLabel : '',
      rescanIntervalS: 60,
      ignorePerms: false,
      order: 'random',
      path: '',
      type: 'readwrite',
      fileVersioningSelector: 'none',
      minDiskFreePct: 1,
      autoNormalize: true,
      devices: [
        {deviceID: myID},
        accepted && {deviceID: device},
      ],
      maxConflicts: 10,
      simpleKeep: 5,
      staggeredCleanInterval: 3600,
      staggeredMaxAge: 365,
      staggeredVersionsPath: '',
      trashcanClean: 0,
    }

    return h('div.padded-more', [
      h('header.page-header', [
        h('h2', 'Add Folder'),
      ]),
      h('hr'),
      h(FolderEdit, {ref: 'form', initialValues, onSubmit}),
    ])
  }
}

FolderAdd.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  myID: PropTypes.string.isRequired,
  folderRejected: PropTypes.object.isRequired,
  clearFolderRejected: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  myID: state.myID,
  folderRejected: state.folderRejected,
})

export default connect(
  mapStateToProps,
  {clearFolderRejected},
  undefined,
  {withRef: true},
)(FolderAdd)
