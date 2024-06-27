const {createApp}= Vue;

createApp({
    data() {
        return{
            emails:[],
        }
    },

    methods:{

        apiEmails() {
            // creazione di un nuovo array per le email recuperate prima del caricamento
            const promiseEmails = [],
            // mandiamo 10 richieste all api con un ciclo for 
            for (let i = 0; i < 10; i++) {
                // utilizziamo la proprietà push per inserire nel array di email promesse le mail recuperate 
                promiseEmails.push(axios.get('https://flynn.boolean.careers/exercises/api/random/mail'));
            }

                    .then((risposta) => {
                        // insieriamo le mail generate e recuperate da axios nel nostro array emails
                        this.emails.push(risposta.data.response);
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