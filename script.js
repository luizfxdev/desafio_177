// Função principal para decifrar a mensagem alienígena
function decodeMessage() {
  // Obter a sequência de entrada do textarea
  const inputSequence = document.getElementById('inputSequence').value.trim()
  const outputElement = document.getElementById('output')

  // Verificar se o campo está vazio
  if (!inputSequence) {
    outputElement.textContent = 'Por favor, insira uma sequência numérica.'
    outputElement.style.color = '#e74c3c'
    return
  }

  try {
    // Processar a sequência de entrada
    const numbers = inputSequence.split(',').map(num => parseInt(num.trim(), 10))

    // Verificar se há números inválidos
    if (numbers.some(isNaN)) {
      throw new Error('A sequência contém valores não numéricos.')
    }

    // Decifrar cada número conforme as regras
    const decodedMessage = numbers.map(number => {
      if (number % 15 === 0) return 'ZogBlip'
      if (number % 3 === 0) return 'Zog'
      if (number % 5 === 0) return 'Blip'
      return number.toString()
    })

    // Exibir o resultado formatado
    outputElement.innerHTML = `<strong>Mensagem Decifrada:</strong><br>${decodedMessage.join(', ')}`
    outputElement.style.color = '#333'
  } catch (error) {
    // Tratar erros de processamento
    outputElement.textContent = `Erro: ${error.message}`
    outputElement.style.color = '#e74c3c'
  }
}

// Função para resetar a aplicação (botão RETORNAR)
function resetApp() {
  document.getElementById('inputSequence').value = ''
  document.getElementById('output').textContent = ''
  document.getElementById('output').style.color = '#333'
}

// Adicionar event listeners para melhor interação
document.addEventListener('DOMContentLoaded', () => {
  const inputSequence = document.getElementById('inputSequence')
  const outputElement = document.getElementById('output')

  // Limpar mensagens de erro quando o usuário começar a digitar
  inputSequence.addEventListener('input', () => {
    if (outputElement.style.color === 'rgb(231, 76, 60)') {
      outputElement.textContent = ''
    }
  })

  // Permitir submeter com Enter (mas manter o botão como ação principal)
  inputSequence.addEventListener('keypress', e => {
    if (e.key === 'Enter' && e.ctrlKey) {
      decodeMessage()
    }
  })
})
