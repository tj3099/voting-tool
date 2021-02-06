export const environment = {
  production: true,
  apiUrl: 'https://csd-stuttgart.de:8443/api',
  texts: {
        welcome: '<h3> Herzlich willkommen zur Mitgliederversammlung des CSD-Stuttgarts!</h3>' +
                  '<p>Über dieses Programm werden heute die Abstimmungen stattfinden. Die Anmeldedaten wurden dazu mit der Anmeldebstätigung versendet. <br>' +
                  'Bitte wende dich bei technischen Problemen an: <a href="mailto:administrator@csd-stuttgart.de">administrator@csd-stuttgart.de</a> oder sprich die Moderation im Chat an</p>',
        buttons: {
          refresh: 'Tabelle neuladen',
          delete: 'Löschen',
          add: 'Hinzufügen'
        },
        login: {
          button: {
            login: 'Anmelden',
            logout: 'Abmelden'
          }, form: {
            mail: 'E-Mail',
            secretKey: 'Passwort',
            tooltipKey: 'Das Passwort mit der Anmeldungsbestätigung zu der Mitgliederversammlung per Mail versendet.',
            tooltipMail: 'Bitte nutze die E-Mail Adresse, die du bei der Anmeldung zur Mitgliederversammlung angegeben hast.'
          },
          alert: {
            success: 'Du bist angemeldet!',
            error: 'Ohje, da ist etwas schiefgelaufen :( Überprüfe die Anmeldedaten und versuche es erneut',
            logout: 'Du bist abgemeldet!'
          }
        }, vote: {
          title: {
            hasNotVoted: 'Wähle als ',
            hasVoted: ' hat schon gewählt'
          },
          texts: {
            description: 'Wenn eine neue Frage geöffnet wurde, klicke auf den Button unterhalb. Dann kannst du eine Option auswählen.'
                        +'Wenn du abstimmen möchtest, hacke die Bestätigung an und drücke auf den Button.' +
                         '<br>Jede*r kann nur einemal abstimmen. Um für jemanden anderes abzustimmen, nutze bitte seine/ihre Login-Daten.'
          }, table: {
            title: 'Titel',
            description: 'Beschreibung',
            voteToSelect: 'Meine Stimme',
            yes: 'Ja',
            no: 'Nein',
            abstention: 'Enthaltung',
            selectedVote: 'Ausgewählt'
          }, form: {
            confirm: 'Ich bestätige meine Wahl!',
            button: 'Stimme für: ',
          }, alert: {
            success: 'Du hast erfolgreich abgestimmt. Nutze den Button um neuzuladen oder melde dich mit anderen Daten erneut an.'
          }
        }
      }
};
