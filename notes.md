
Fetch Themes upon load
render Canvas upon load?
load Modal popup that
    asks for team names
    EVENT! when player submits team names:
        create Team JS Objects
        team scores are set to zero
        clears the modal and inserts a new form for player to select Theme
    load form with select dropdown for each theme name
    EVENT! when player selects theme from the dropdown:
        fetch prompts from that theme
    give player option to start game or add a prompt
    if player selects add a prompt
        take user input and create new prompt (post request)
        reload "start game or add prompt"
    if player selects "start game"
        chooses which team goes first (or just defaults to team 1) and sets turn to that team
        announces team name whose turn it is
        timer counts down from 5
        when timer hits zero:
        load random prompt from theme (or from all prompts if selected "no theme") for 5 seconds then
        disable modal 
        display Canvas
        start countdown timer

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