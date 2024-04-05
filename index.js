const lighttext = document.querySelector("#text-Light");
const darktext = document.querySelector("#text-Dark");
const lighticon = document.querySelector("#light");
const darkicon = document.querySelector("#dark");

//LIght and Dark mode working           fetch()

lighttext.addEventListener("click", () => {
  lighttext.style.display = "none";
  darktext.style.display = "flex";
  darkicon.style.display = "flex";
  lighticon.style.display = "none";
  document.body.classList.remove("darkTheme");
});
darktext.addEventListener("click", () => {
  lighttext.style.display = "flex";
  darktext.style.display = "none";
  darkicon.style.display = "none";
  lighticon.style.display = "flex";
  document.body.classList.toggle("darkTheme");
});

darkicon.addEventListener("click", () => {
  darkicon.style.display = "none";
  lighticon.style.display = "flex";
  darktext.style.display = "none";
  lighttext.style.display = "flex";
  document.body.classList.toggle("darkTheme");
});

lighticon.addEventListener("click", () => {
  darkicon.style.display = "flex";
  lighticon.style.display = "none";
  darktext.style.display = "flex";
  lighttext.style.display = "none";
  document.body.classList.toggle("darkTheme");
});

//Variables

const searchbar = document.querySelector(".page2");
const profilecontainer = document.querySelector(".page3");
const root = document.documentElement.style;
//function that getaccess there values
const get = (para) => document.getElementById(`${para}`);
const url = "https://api.github.com/users/";
const noresults = get("no-result");
const btnsubmit = get("submit");
const input = get("name");
const avatar = get("avatar");
const userName = get("user-name");
const user = get("user");
const date = get("date");
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
const bio = get("profile-description");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_Location = get("location_info");
const page = get("link-info");
const twitter = get("twitter-info");
const company = get("company-info");
const User404 = get("user404");
//Events Listners

btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
    
  }
});

input.addEventListener("keydown", function (elem) {
  if (elem.key == "Enter") {
    if (input.value !== "") {
      getUserData(url + input.value);
      
    }
  }
});

input.addEventListener("input", function () {
  noresults.style.display = "none";
});


//APi Call for UserProfuile data
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}

function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    profilecontainer.style.display = "flex";
    User404.style.opacity = "0";

    function checkNull(p1, p2) {
      if (p1 === "" || p2 === null) {
        p2.style.opacity = 0.5;
        p2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${
      months[datesegments[1] - 1]
    } ${datesegments[0]}`;
    bio.innerText =
      data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_Location.innerText = data.location
      ? `${data.location}`
      : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = data.twitter_username
      ? `${data.twitter_username}`
      : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter)
      ? `https://twitter.com/${data.twitter_username}`
      : "#";
    company.innerText = data.company ? `${data.company}` : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "flex";
    profilecontainer.style.display = "none";
    User404.style.opacity = "1";
  }
}

getUserData(url + "pushkarcode");
