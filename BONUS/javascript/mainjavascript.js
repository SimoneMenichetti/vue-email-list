const {createApp}= Vue;

createApp({
    data() {
        return{
            emails:[],
        }
    },

    methods:{

        apiEmails() {
            // creazione di un nuovo array per le email recuperate prima del caricamento e le nuove promesse da risolvere singolarmente
            const promiseEmails = [];
            // mandiamo 10 richieste all api con un ciclo for 
            for (let i = 0; i < 10; i++) {
                // utilizziamo la proprietà push per inserire nel array di email promesse le mail recuperate 
                promiseEmails.push(axios.get('https://flynn.boolean.careers/exercises/api/random/mail'));
            }
            
            // utilizzo di promise.all per riferire all array di risolvere tutto cio che va risolto nell array
            Promise.all(promiseEmails)
            .then((responses) => {
                this.emails = responses.map(response => response.data.response);
                console.log('Emails :', this.emails);
            })
                // inserimento proprietà catch per catturare e rilevare un possibile errore di recupero dal api
            .catch((error) => {
                console.error('Errore recupero email:', error);
            });
           
        },
    },
    // utilizzo di mounted richiamando la funzione apiEmails non appena i components vengono montati
    mounted(){
        this.apiEmails(); 
        

    },

}).mount('#app');