import "../lib/firebase.js";
import { userLogout, auth } from "../lib/authentication.js";
import { publicatedPost, getPost } from "../lib/firestore.js";
import card from "../components/card.js";

export default () => {
const container = document.createElement("section");
container.setAttribute("class", "section");
const template = `
<nav class="nav-section">
<ul>
<li><a href="#timeline">Linha do Tempo</a></li>
<li><a href="#profile">Perfil</a></li>
</ul>
<hr>
</nav>
`;
container.innerHTML = template;

const feed = document.createElement("form");
feed.setAttribute("class", "feed-section");

const mold = `
<div class="div-logout">
<button class="logout">Sair</button>
</div>
<div class="post">
<textarea class="title" type="text" placeholder="Título" wrap="hard" required></textarea>
<span class="error-title"></span>
<textarea class="text" type="text" placeholder="Texto" wrap="hard" required></textarea>
<span class="error-text"></span>
<button class="btn-post" type="submit">Postar</button>
</div>
<div class="feed"><div>
`;

feed.innerHTML = mold;
container.appendChild(feed);

const post = container.querySelector(".feed");
const buttonPost = container.querySelector(".btn-post");
const valueTitle = container.querySelector(".title");
const valueText = container.querySelector(".text");
const logout = container.querySelector(".logout");
const data = new Date();
const errorTitle = container.querySelector(".error-title");
const errorText = container.querySelector(".error-text");
buttonPost.addEventListener("click", async (e) => {
e.preventDefault();
const title = valueTitle.value;
const text = valueText.value;
if(title.length < 3){
errorTitle.innerHTML = "Insira um título válido"
}else if(text.length < 10){
errorText.innerHTML = "Insira um texto válido"
}else{
const id = await publicatedPost(title, text);
errorTitle.innerHTML = "";
errorText.innerHTML = "";
auth.currentUser.displayName;
showAllPosts();
valueTitle.value = "";
valueText.value = "";
}
});
logout.addEventListener("click", (e) => {
e.preventDefault();
userLogout().then(function () {
window.location.hash = "";
});
});
const showAllPosts = async () => {
const allPosts = await getPost();
allPosts.map(item => {
const postElement = card(item);
post.prepend(postElement);
})
}
showAllPosts();
return container;
}; 

