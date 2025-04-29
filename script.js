const supabaseUrl = 'https://iygbttenrojhxqrfuowr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Z2J0dGVucm9qaHhxcmZ1b3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDA5NjMsImV4cCI6MjA2MTUxNjk2M30.JV7WHaPN06ir1PKRc6aQxq_H6mcAA2qcN2NscCK4op0';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



// Buscar links ao carregar
window.onload = async function () {
  const { data, error } = await supabase.from('links').select('*');
  if (data) atualizarLista(data);
};

// Adicionar novo link
async function adicionarLink() {
  const nome = document.getElementById('nome').value.trim();
  const link = document.getElementById('link').value.trim();
  if (nome && link) {
    await supabase.from('links').insert([{ nome, link }]);
    const { data } = await supabase.from('links').select('*');
    atualizarLista(data);
    document.getElementById('nome').value = '';
    document.getElementById('link').value = '';
  }
}

// Atualizar lista de links
function atualizarLista(links) {
  const lista = document.getElementById('listaLinks');
  lista.innerHTML = '';
  links.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<a href="${item.link}" target="_blank">${item.link}</a><span>${item.nome}</span>`;
    lista.appendChild(div);
  });
}
