import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TextInput,
    Dimensions,
    Platform
} from 'react-native';

import {AppLoading} from 'expo';

import ToDo from './ToDo'

const {width} = Dimensions.get("window")

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newToDo: "",
            loadedTodos: false,
            toDos: {}
        }
    }

    componentDidMount = () => {
        this._loadToDos();
    }

    render() {
        const {newToDo, loadedTodos, toDos} = this.state;

        if (!loadedTodos) {
            return <AppLoading/>;
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Text style={styles.title}>To Do</Text>
                <View style={styles.card}>
                    <TextInput
                        style={styles.input}
                        placeholder={"New To Do"}
                        value={newToDo}
                        onChangeText={this._controlnewToDo}
                        returnKeyType={"done"}
                        autoCorrect={false}
                        onSubmitEditing={this._addTodo}></TextInput>
                    <ScrollView contentContainerStyle={styles.toDos}>
                        {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo} />)}
                    </ScrollView>
                </View>
            </View>
        )
    }

    _controlnewToDo = text => {
        this.setState({newToDo: text})
    }

    _loadToDos = () => {
        this.setState({loadedTodos: true});
    }

    _addTodo = () => {
        const { newToDo } = this.state;

        if (newToDo !== '') {
            this.setState(prevState => {
                const ID = this._uuidv4();
                const newToDoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newToDo,
                        createdAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newToDo: '',
                    toDos: {
                        ...prevState.toDos, 
                        ...newToDoObject
                    }
                };
                return {
                    ...newState
                };
            });
        }
    }

    _uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x'
                    ? r
                    : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f23657',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 50,
        fontWeight: "200",
        marginBottom: 30
    },
    card: {
        backgroundColor: 'white',
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50,50,50)",
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25
    },
    toDos: {
        alignItems: 'center'
    }
});