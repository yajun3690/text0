
import React,{ Component,Fragment } from 'react'
import './App.css'
import Item from './Item.js'

class App extends Component{
	//初始化state
	constructor(props){
		super(props);
		this.state={
			list:['吃饭','睡觉'],
			val:''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	handleAdd(){
		this.setState(preState=>({
			list:[...this.state.list,this.state.val],
			val:''	
		}))
	}
	handleChange(ev){
		const val = ev.target.value
		this.setState(()=>({
			val
		}))
	}
	handleDel(index){
		const list  = [...this.state.list]
		list.splice(index,1)
		this.setState(()=>({
			list
		}))
	}
	getItems(){
		return this.state.list.map((item,index)=>{
			return <Item key={index} content={item} list={this.state.list} index={index} handleDel={this.handleDel.bind(this,index)}/>

		})
	}
	render(){
		return(
			<div className='App'>
				<input onChange={this.handleChange} value={this.state.val} />
				<button onClick={this.handleAdd}>新增</button>
				<ul>
					{
						this.getItems()
					}
				</ul>
			
			</div>
		) 
	}
}
export default App


