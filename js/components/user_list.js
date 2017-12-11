/**
 * Created by gayane.gasparyan on 01/04/2016.
 */
import React, { Component } from 'react';

class ItemList extends Component  {
    constructor(props) {
        super(props);
    }
    deleteItem(index) {
        this.props.del(index);
    }
    // 
   
    render(){
        var showItems = [];
        var num = 10;
        var list;

        for (var i = 0; i < num; i++) {
            if (this.props.items[i]) {
               showItems.push(this.props.items[i]); 
            }
        }

        if (showItems.length>0) {
            list = showItems.map((item, index) => {
            
                return (
                    <div className="news__item" key={index}>
                        <div className="news__title">{item.title}</div>
                        <div className="news__body">{item.body}</div>
                        <button className="news__btn" onClick={event => this.deleteItem(item.id)}>
                            Прочитал
                        </button>
                    </div>
                ); 
            });
        }
        else{
            list =  <div className="news__none"> Больше ничего нет </div>            
        }
           
        return (
            <div>
                <div className="news">
                    {list}
                </div>
            </div>
        );

    }
};

export default ItemList;
