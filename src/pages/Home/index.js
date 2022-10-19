import { useState } from "react";
import { Header } from "../../components/Header"
import background from "../../assets/background.png"
import ItemList from "../../components/ItemList"
import "./styles.css"

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [repos, setRepos] = useState([]);


  const handleGetData = async () => {

    if(user===''){
      alert("Um usuário deve ser informado")
    } else {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    setCurrentUser(newUser);

    const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();
    setRepos(newRepos);

    document.querySelector(".container").style.visibility = "visible";
    }
  }


  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background App" />
        <div className="info">
          <div>
            <input name="usuario" value={user} 
            onChange={event => setUser(event.target.value)} 
            placeholder="@Username" />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          <div className="container">
          <div className="perfil">
            <img src={currentUser.avatar_url} className="profile" alt="foto de perfil"/>
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
          <div className="repositorios">
            <h4>Repositórios</h4>
            { repos.map((item) => {
                return(
                  <ItemList title={item.name} description={item.description} />
                )
              })
            }
          </div>
          </div>


        </div>
      </div>
    </div>
  );

}

export default App;
