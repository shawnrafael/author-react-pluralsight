import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import "./AddAuthorForm.css";

class AuthorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        };        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    handleAddBook(event){
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
    }

    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
            return <form onSubmit={this.handleSubmit}>
                <div className="AddAuthorForm_input"> 
                    <label htmlFor="name">Name</label><br/>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm_input"> 
                    <label htmlFor="imageUrl">Image Url</label><br/>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm_input"> 
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <label htmlFor="bookTemp">Books</label><br/>
                    <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
                    <input type="button" value="+" onClick={this.handleAddBook} />
                </div><br/>
                <input type="submit" value="Add"></input>
            </form>
    }
}



function AddAuthorForm ({onAddAuthor}){
    return (
        <div className="AddAuthorForm">
            <h1>Add Author</h1>
            <AuthorForm onAddAuthor={onAddAuthor} />
        </div>
    );
}

function mapDispatchToProps(dispatch, props){
    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author })
            props.history.push('/');
        }
    };
}

export default withRouter( connect(() =>{}, mapDispatchToProps)(AddAuthorForm));