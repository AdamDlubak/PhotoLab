login(email, password) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    return this.http
      .post(this.baseUrl + "/auth/login", JSON.stringify({email, password}),
      { headers } )
      .map(res => res.json())
      .map(res => {
        localStorage.setItem("auth_token", res.auth_token);
        localStorage.setItem("user_id", JSON.stringify(res.user_id));
        this.loggedIn = true;
        checkIfAdmin(res.auth_token);
        this._authNavStatusSource.next(true);
        return res.user_id;
      })
      .catch(this.handleError);
}