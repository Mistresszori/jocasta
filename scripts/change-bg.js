// JavaScript Document
function initJS(){
     changeContentByExactTime();

}
  // Função para obter a hora e os minutos atuais
        function changeContentByExactTime() {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const body = document.body;
            const greeting = document.getElementById('greeting');

            // Alterações conforme a hora e os minutos
            if (hour === 9 && minutes === 30) {
                body.className = 'special-time';
                greeting.textContent = 'Hora Especial: 9h30!';
            } else if (hour >= 6 && hour < 12) {
                body.className = 'morning';
                greeting.textContent = 'Bom dia';
            } else if (hour >= 12 && hour < 18) {
                body.className = 'afternoon';
                greeting.textContent = 'Boa tarde';
            } else {
                body.className = 'evening';
                greeting.textContent = 'Boa noite';
            }
        }

        // Chama a função ao carregar a página
        changeContentByExactTime();

        // Atualiza a cada minuto para verificar mudanças
        setInterval(changeContentByExactTime, 60000);