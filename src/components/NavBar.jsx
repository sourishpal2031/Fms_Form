import {AppBar,Toolbar,Typography,styled} from "@mui/material"
import {NavLink} from 'react-router-dom';


const Header=styled(AppBar)`
background:#111111;
`
const Tabs=styled(NavLink)`
font-size:20px;
margin-right:20px;
color:inherit;
text-decoration: none;
`

const NavBar=()=>{
    return(
        <Header position="static">
            <Toolbar>
<Tabs to="./" exact>FortescueForm</Tabs>
<Tabs to="all" exact>All Users</Tabs>
<Tabs to="add" exact>Add User</Tabs>
            </Toolbar>
        </Header>

    )
}

export default NavBar;