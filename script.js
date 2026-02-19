const sendBtn = document.querySelector('.send-btn');
const input = document.querySelector('#user-input');
const chatLog = document.querySelector('#chat-log');

function addMessage(text, isUser){
    const msg = document.createElement('div');
    msg.style.padding = '10px';
    msg.style.margin = "5px 0";
    msg.style.borderRadius = "10px";
    msg.style.maxWidth = "80%";
    
    msg.style.alignSelf = isUser ? "flex-end" : "flex-start";
    msg.style.backgroundColor = isUser ? "#303134" : "#1e1f20";

    if (isUser){
        msg.textContent = text;
    }else{
        msg.innerHTML = marked.parse(text)
    }
    
    chatLog.appendChild(msg);

    chatLog.scrollTop = chatLog.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const inputPrompt = input.value.trim();

    if (inputPrompt === ""){
        return 
    }
    
    addMessage(input.value, true);
    input.value = "";
    
    try {
        const responseText = await askAI(inputPrompt);

        addMessage(responseText, false)
        
    } catch (error) {
        addMessage("Sorry, the server is down or having issues.", false);
        console.error(error);
    }

});


async function askAI(prompt) {
    const response = await fetch("http://localhost:3000/chat", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: prompt})
    })  
    const data = await response.json();
    return data.reply; 
}
