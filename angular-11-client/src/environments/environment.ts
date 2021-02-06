export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  texts: {
      welcome: '<h3> Welcome to this awesome tool!</h3>',
      buttons: {
        refresh: 'Refresh view',
        delete: 'delete',
        add: 'add'
      },
      login: {
        button: {
          login: 'Login',
          logout: 'Logout'
        }, form: {
          mail: 'Mail',
          secretKey: 'password',
          tooltipKey: 'Your password',
          tooltipMail: 'Your mail'
        },
        alert: {
          success: 'You are logged in!',
          error: 'Something went wrong, pleas check your credentials!',
          logout: 'You are logged out!'
        }
      }, vote: {
        title: {
          hasNotVoted: 'Vote now as ',
          hasVoted: ' has already voted'
        },
        texts: {
          description: 'When a new question is opened, please press "Load". You can select the option, you want to vote. Click vote for sending.' +
                       '<br>You only have one vote per user. If you want to vote for another user, please log out, and log in again, with the other mail and secret key.'
        }, table: {
          title: 'Title',
          description: 'Description',
          voteToSelect: 'My vote',
          yes: 'Yes',
          no: 'No',
          abstention: 'Abstention',
          selectedVote: 'Selected'
        }, form: {
          confirm: 'I confirm my vote!',
          button: 'Vote for: ',
        }, alert: {
          success: 'You voted successfully! Use the button to refresh or login again.'
        }
      }
    }
};

