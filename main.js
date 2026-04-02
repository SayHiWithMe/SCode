// Khởi tạo không gian làm việc Blockly
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
    trashcan: true
});

// Hàm thực thi mã
function runCode() {
    // Chuyển đổi các khối lệnh hiện có thành code JavaScript
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Vòng lặp quá lâu!";\n';
    
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const outputDiv = document.getElementById('console-output');
    
    outputDiv.innerHTML = "<strong>Đang chạy...</strong><br>";
    
    try {
        // Thay thế hàm print mặc định để hiển thị lên màn hình web thay vì alert
        const customCode = code.replace(/window\.alert/g, "updateOutput");
        eval(`function updateOutput(text) { document.getElementById('console-output').innerHTML += text + '<br>'; }; ${customCode}`);
    } catch (e) {
        outputDiv.innerHTML += "<span style='color:red'>" + e + "</span>";
    }
}
