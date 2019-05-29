import axios from 'axios'

export default {
	getPublicConfig(subdomain) {
		var path = '/unidemo/public/config/' + subdomain  
		return axios.get(path)
		.then(response => {
			return response.data
		})

	}
}

