const _inp = document.getElementById('inp');
const ASK = document.getElementById('ask');

_inp.addEventListener('keydown', event => {
    if(event.key === 'Enter'){
        event.preventDefault();
        ASK.click();
        _inp.value = '';
    }
});



async function query(data) {
	if(localStorage.getItem('API') === null){
		localStorage.setItem('API', prompt('Please Enter Hugging Face API:'));
	}

	
	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('API')}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

async function ask(text){
    let result = 'Sorry, I cannot ask :(';

    try{
        await query({ 
            messages: [
                {
                    role: "user",
                    content: text,
                },
            ],
            model: "deepseek-ai/DeepSeek-R1:novita",
        }).then((response) => {
            result = JSON.stringify(response);
        });

        return result
    } catch(E){
        console.error(E)
    }

}
