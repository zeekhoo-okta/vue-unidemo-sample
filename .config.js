export default {
	oidc: {
		issuer: "https://needsconfig.okta.com/oauth2/needsconfig",
		client_id: "needsconfig",
		redirect_uri: "http://localhost:8080/implicit/callback",
		scope: "openid profile email"
	}
}
