const _inp = document.getElementById('inp');
const ASK = document.getElementById('ask')

_inp.addEventListener('keydown', event => {
    if(event.key === 'Enter'){
        event.preventDefault();
        ASK.click();
        _inp.value = '';
    }
});



async function query(data) {
    const base32 = 'aGZfeE93QWFuUE9iUVJFRURxVVNtdkxTSWdpVlFRT0NZS0xRRQ==' 
    // This code is for youtube video.
    const binaryString = atob(base32);
    const utf8Bytes = Uint8Array.from(binaryString, (m) => m.codePointAt(0));
	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${new TextDecoder().decode(utf8Bytes)}`,
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
