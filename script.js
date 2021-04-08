
const App = {
    data(){
      return{
        users: [],
        userEditId: '',
        search: '',
        activeopen: ''
      }
    },
    mounted(){
        this.getUsers();
    },
    computed:{
        filteredUsers: function(){
            return this.users.filter((user)=>{
                return user.name.toLowerCase().match(this.search)
                || user.name.match(this.search)
            })
        }
    },
    methods:{
        blurUser(){
            this.userEditId = ''
        },
        settoEditId(user){
            this.userEditId = user.id;
            setTimeout(()=>{
                document.getElementById(`user-edit-${user.id}`).focus()
            }, 1)
        },
        async getUsers(){
            const {data, status} = await axios.get('http://localhost:3000/users');
            this.users = data;
        },
        async deleteUser(index){
            const id = this.users[index].id
            this.users.splice(index,1)
            const { status } = await axios.delete(`http://localhost:3000/users/${id}/deleted`);
            if (status != 200){
                alert('error');
                this.getUsers();
            }
        },
        async updateUser(index){
            this.userEditId = '';
            const id = this.users[index].id;
            const { status } = await axios.post(`http://localhost:3000/users/${id}/update`,{
               name: this.users[index].name,
               role: this.users[index].role
            });
                this.getUsers();
            if (status != 200){
                alert('error');
                this.getUsers();
            }
        },
        async disactivateUser(index){
            const id = this.users[index].id;
            const { status } = await axios.post(`http://localhost:3000/users/${id}/disactive`);
            this.getUsers();
            if (status != 200){
                alert('error');
                this.getUsers();
            }
        }
        
    }
}
Vue.createApp(App).mount('#app')