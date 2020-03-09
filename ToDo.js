import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native';

import PropTypes from 'prop-types';

const {width} = Dimensions.get("window");

export default class ToDo extends Component {
    static propTypes = {
        id: PropTypes.bool,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isCompleted: false,
            toDoValue: ""
        }
    }

    render() {
        const {isEditing, isCompleted, toDoValue} = this.state;
        const {text} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View
                        style={[
                        styles.circle, isCompleted
                            ? styles.completedCircle
                            : styles.uncompletedCircle
                    ]}></View>
                </TouchableOpacity>

                {isEditing
                    ? (
                        <TextInput
                            style={[
                            styles.text, isCompleted
                                ? styles.completedText
                                : styles.uncompletedText
                        ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controlInput}></TextInput>
                    )
                    : (
                        <Text
                            style={[
                            styles.text, isCompleted
                                ? styles.completedText
                                : styles.uncompletedText
                        ]}>{text}</Text>
                    )}

                {isEditing
                    ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionsContainer}>
                                    <Text style={styles.actionsText}>☑</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                    : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionsContainer}>
                                    <Text style={styles.actionsText}>✐</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionsContainer}>
                                    <Text style={styles.actionsText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        )
    }

    _toggleComplete = () => {
        this.setState(prevState => {
            return ({
                isCompleted: !prevState.isCompleted
            });
        });
    }

    _startEditing = () => {
        const {text} = this.props;

        this.setState({isEditing: true, toDoValue: text})
    }

    _finishEditing = () => {
        this.setState({isEditing: false})
    }

    _controlInput = text => {
        this.setState({toDoValue: text})
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: '#bbb'
    },
    uncompletedCircle: {
        borderColor: 'red'
    },
    text: {
        fontWeight: '600',
        textAlign: 'left',
        width: width - 175,
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: '#353839'
    },
    actions: {
        flexDirection: 'row'
    },
    actionsContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    }
});