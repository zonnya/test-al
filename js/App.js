import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ItemList from './components/user_list';
import SearchInput from './components/search_input';
import $ from 'jquery';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            StackItems: []
       };
    }
    componentDidMount() {
        //get json data from the generated file
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            dataType: 'json',
            cache: false,
            success: function (items) {
                this.setState({items});             
                this.setState({StackItems: items});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    //Удаляем заданный элемент:
    deleteItem(index) {
        var deleteElement = this.state.items;   
        for (var i = this.state.StackItems.length - 1; i >= 0; i--) {
            if (this.state.StackItems[i].id == index){
                this.state.StackItems.splice(i, 1);
            }
        }     
        for (var i = deleteElement.length - 1; i >= 0; i--) {
            if (deleteElement[i].id == index){
                deleteElement.splice(i, 1);
            }
        }  
        this.setState({items: deleteElement});
    }
    
    changeList(prop) {
        var term = prop['prop'].toLowerCase(),
            items = this.state.StackItems,
            newList = [];

        for (var i = 0; i < items.length; i++) {
            if (items[i]['title'].toLowerCase().indexOf(term) > -1) {
                //push data into results array
                newList.push(items[i]);
            }
        }
        this.setState({items: newList});
    } 



    render() {

        return (
            <div className="">
                <div className="col-sm-12">
                    <SearchInput onSearchTermChange={prop => this.changeList({prop})}/>
                </div>
                <div className="col-sm-12">
                    <ItemList items={this.state.items} del={prop => this.deleteItem(prop)}/>
                </div>
            </div>
        );
        
    }

} 