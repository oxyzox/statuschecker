document.addEventListener('DOMContentLoaded', () => {
    const statusBox = document.getElementById('server-status');
    const statusIcon = document.getElementById('server-icon');
    const form = document.getElementById('status-form');

    async function fetchServerStatus(ip, port, type) {
        try {
          
            const url = `http://infra-sg01.zygo.cloud:1034/status/${type}?ip=${ip}&port=${port || ''}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.online) {
                statusBox.innerHTML = `
                    <p><strong>Server Status:</strong> Online</p>
                    <p><strong>Version:</strong> ${data.version || 'N/A'}</p>
                    <p><strong>Players Online:</strong> ${data.players_online} / ${data.max_players}</p>
                    <p><strong>Latency:</strong> ${data.latency}ms</p>
                `;

               
                if (data.icon) {
                    statusIcon.innerHTML = `<img src="${data.icon}" alt="Server Icon" />`;
                } else {
                    statusIcon.innerHTML = '';  
                }
            } else {
                statusBox.innerHTML = `<p>Server is offline or unreachable.</p>`;
                statusIcon.innerHTML = ''; 
            }
        } catch (error) {
            statusBox.innerHTML = `<p>Error fetching server status. Please try again.</p>`;
            console.error("Error fetching server status:", error);  
        }
    }

    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const ip = document.getElementById('ip').value;
        const port = document.getElementById('port').value;
        const type = document.getElementById('type').value;

        
        fetchServerStatus(ip, port, type);
    });
});
