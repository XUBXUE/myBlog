import '@/assets/styles/jsx.scss'

export default {
  data(){
    return {
      author: 'XUBXUE_'
    }
  },
  render() {
    return (
      <div id="testJsx">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}