fetch prompts and themes upon load ?
or ask team what team name and theme they're doing and THEN fetch prompts from that them

Instructions with team name forms to display upon load

when user submits team names:
    team scores are set to zero
     give user option to start game or add a prompt
         if user selects add a prompt
             take user input and create new prompt (post request)
             reload "start game or add prompt"
         else
             app chooses which team goes first (or just defaults to team 1) and sets turn to that team
         end ?

         announces team name whose turn it is
         has another start button that will actually start game play
             when start button is pressed: 
                 counter counts down from five then
                 displays prompt card for 5 seconds then
                 canvas displays and timer counts down from 60 seconds
             when 60 seconds is up:
                 canvas is frozen
                 modal pops up asking if team name earned a point
                     if yes
                         add point to team's score
                         display scores and 
                         goes back to announcing which team's turn it is and start game play button
                     else
                         just goes back to announcing which team's turn it is and start game play button
                     end

         above loop repeats until one teams score reaches 10 points or maybe just a set number of turns are reached