const storage = {

	get: ( item ) => window.JSON.parse( window.localStorage.getItem( item ) ),

	set: ( item = null, data = null )=> {

		try {
			window.localStorage.setItem( item, window.JSON.stringify( data ) )
		} catch ( e ) {
			throw e.message
		}
	}

}

export default storage