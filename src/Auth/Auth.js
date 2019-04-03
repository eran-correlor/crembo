
const Auth = {
  
  _isAuthenticated: false,

  isAuthenticated() {
    console.log("_isAuthenticated", this._isAuthenticated)
    let at = localStorage.getItem('accessToken');
    console.log("access token?", at);
    this._isAuthenticated = at !== null;
    console.log("_isAuthenticated", this._isAuthenticated)
    return this._isAuthenticated;

  },
  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  authFetch(url) {

    let accessToken = Auth.getAccessToken();
    if (accessToken === null) {
      return url;
    } else {

      if (url.includes("?")) {
        url += "&access_token=" + accessToken;
      } else {
        url += "?access_token=" + accessToken;
      }
      return fetch(url);



    }
  },

  authPost(url, uRow) {
    let postUrl ="";
    let accessToken = Auth.getAccessToken();
    if (accessToken === null) {
      return url,  + accessToken;
    } else {

      if (url.includes("?")) {
        postUrl = url +"&access_token=" + accessToken;
      } else {
        postUrl = url+ "?access_token=" + accessToken;
      }
      return fetch(postUrl,uRow);

    }
  },

  authenticate(email, pw, cb) {

    fetch('/api/Managers/login', {
      method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: pw })
    })

      .then(response => { return response.json() }).then(res => {

        //res == userId, ttl, id(=accessToken), created
        console.log("res after login", res);
        if (res.error) {
          console.log("there is an error")
          this._isAuthenticated = false;
          localStorage.setItem('accessToken', null);
          localStorage.setItem('userId', null);
          return cb(false);
        } else {
          console.log("there is NOOOOOO error")
          console.log("is this the access token?", res.id);
          this._isAuthenticated = true;
          localStorage.setItem('accessToken', res.id);
          localStorage.setItem('userId', res.userId);

          return cb(true)
        }

      });
  },
  logout(cb) {

    localStorage.removeItem('accessToken', '');
    this._isAuthenticated = false;
    return;
  }

}

export default Auth;