import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight, Modal } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text
} from 'react-native-elements'
import percent from 'rnative-percent'

class CollectData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      next: 0,
      error: false
    }

    // BINDING FOR FUNCTIONS
    this._onNext = this._onNext.bind(this)
    this._onBack = this._onBack.bind(this)
  }

  render() {
    const { next } = this.state
    const questions = [
      { name: 'SuSu Title', current: 'title' },
      { name: 'Amount', current: 'amount' },
      { name: 'Cycles', current: 'cycles' },
      { name: 'Members', current: 'members' }
    ]

    if (next < questions.length) {
      const current = questions[next].current
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={styles.dataModal}>
            <View>
              <Text h2 style={styles.mainText}>
                {questions[next].name}
              </Text>
              <View style={styles.formBox}>
                <FormInput
                  // containerStyle={{ width: 25, padding: 0 }}
                  value={`${this.props[current]}`}
                  onChangeText={input => this._onInput(input, current)}
                />
              </View>

              <FormValidationMessage>
                {this.state.error ? '* This field is required' : ''}
              </FormValidationMessage>

              <View style={styles.options}>
                <TouchableHighlight onPress={this._onBack}>
                  <Text>Back</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this._onClosed()}>
                  <Text>Close</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this._onNext(current)}>
                  <Text>Next</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      )
    }

    return (
      // DONE WITH ANSWERING THE QUESTIONS
      <View style={styles.dataModal}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={styles.dataModal}>
            <TouchableHighlight onPress={() => this.props.activeModal()}>
              <Text h2 style={styles.completeText}>
                Done
              </Text>
            </TouchableHighlight>

            <View style={styles.options}>
              <TouchableHighlight onPress={() => this._onBack}>
                <Text>Back</Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => this._onClosed(true)}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  // WILL ADD THE INPUT TO THE STATE
  _onInput(input, current) {
    this.props._onInput(input, current)
  }

  // WILL UPDATE FOR NEXT ITERATION
  _onNext(current) {
    const input = this.props[current]

    if (input <= 0 || input === '') {
      this.setState({ error: true })
    } else {
      const { next } = this.state
      this.setState({ next: next + 1, error: false })
    }
  }

  // WILL UPDATE FOR Previous ITERATION
  _onBack() {
    const { next } = this.state

    if (next > 0) {
      this.setState({ next: next - 1 })
    }
  }

  _onClosed(done = false) {
    if (done) {
      this.props.activeModal()
    }
    this.props.goBack()
  }
}

const styles = StyleSheet.create({
  formBox: {
    display: 'flex',
    flexDirection: 'row'
  },
  mainText: {
    color: '#636e72',
    textAlign: 'center'
  },
  completeText: {
    color: '#00b894',
    textAlign: 'center'
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    // DIMENSIONS
    width: percent(30),
    alignSelf: 'center'
  },
  dataModal: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
    height: percent(90)
  }
})

export default CollectData
