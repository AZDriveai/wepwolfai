"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Wand2,
  Code,
  Eye,
  Download,
  Play,
  Palette,
  Database,
  Globe,
  Smartphone,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GeneratedApp {
  id: string
  name: string
  description: string
  code: {
    html: string
    css: string
    js: string
  }
  preview: string
  status: "generating" | "completed" | "error"
  progress: number
}

export default function AppGenerator() {
  const [appDescription, setAppDescription] = useState("")
  const [appName, setAppName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [selectedFramework, setSelectedFramework] = useState("react")
  const [selectedStyle, setSelectedStyle] = useState("modern")
  const [generatedApps, setGeneratedApps] = useState<GeneratedApp[]>([])
  const [activeTab, setActiveTab] = useState<"prompt" | "preview" | "code">("prompt")

  const { toast } = useToast()

  const frameworks = [
    { id: "react", name: "React", icon: "⚛️", description: "مكتبة JavaScript حديثة" },
    { id: "vue", name: "Vue.js", icon: "💚", description: "إطار عمل تدريجي" },
    { id: "angular", name: "Angular", icon: "🅰️", description: "منصة تطوير شاملة" },
    { id: "nextjs", name: "Next.js", icon: "▲", description: "إطار React للإنتاج" },
  ]

  const styles = [
    { id: "modern", name: "عصري", color: "bg-blue-500/20 text-blue-400" },
    { id: "minimal", name: "بسيط", color: "bg-gray-500/20 text-gray-400" },
    { id: "dark", name: "داكن", color: "bg-purple-500/20 text-purple-400" },
    { id: "colorful", name: "ملون", color: "bg-rainbow-500/20 text-rainbow-400" },
  ]

  const appTemplates = [
    {
      title: "تطبيق إدارة المهام",
      description: "تطبيق بسيط لإضافة وإدارة المهام اليومية",
      prompt:
        "أنشئ تطبيق إدارة مهام بواجهة بسيطة يحتوي على إضافة مهام جديدة، تعديل المهام الموجودة، ووضع علامة على المهام المكتملة",
    },
    {
      title: "حاسبة متقدمة",
      description: "حاسبة رقمية مع عمليات متقدمة",
      prompt: "أنشئ حاسبة رقمية متقدمة تدعم العمليات الأساسية والعلمية مع واجهة جميلة ومتجاوبة",
    },
    {
      title: "مولد كلمات المرور",
      description: "أداة لتوليد كلمات مرور قوية وآمنة",
      prompt: "أنشئ مولد كلمات مرور قوية مع خيارات للطول ونوع الأحرف المستخدمة وعرض قوة كلمة المرور",
    },
    {
      title: "تطبيق الطقس",
      description: "عرض حالة الطقس والتوقعات",
      prompt: "أنشئ تطبيق طقس يعرض درجة الحرارة الحالية والتوقعات مع واجهة جذابة وأيقونات للطقس",
    },
  ]

  const handleGenerate = async () => {
    if (!appDescription.trim() || !appName.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)

    const newApp: GeneratedApp = {
      id: Date.now().toString(),
      name: appName,
      description: appDescription,
      code: { html: "", css: "", js: "" },
      preview: "",
      status: "generating",
      progress: 0,
    }

    setGeneratedApps((prev) => [newApp, ...prev])

    // محاكاة عملية التوليد
    const steps = [
      "تحليل المتطلبات...",
      "إنشاء الهيكل الأساسي...",
      "توليد المكونات...",
      "تطبيق التصميم...",
      "إضافة الوظائف...",
      "اختبار التطبيق...",
      "تحسين الأداء...",
      "إنهاء التوليد...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGeneratedApps((prev) =>
        prev.map((app) => (app.id === newApp.id ? { ...app, progress: ((i + 1) / steps.length) * 100 } : app)),
      )
    }

    // Generate actual code based on description
    const generatedCode = generateCodeFromDescription(appDescription)

    setGeneratedApps((prev) =>
      prev.map((app) =>
        app.id === newApp.id
          ? {
              ...app,
              status: "completed",
              code: generatedCode,
              preview: createPreviewUrl(generatedCode),
            }
          : app,
      ),
    )

    setIsGenerating(false)
    setAppDescription("")
    setAppName("")
    setActiveTab("preview")

    toast({
      title: "تم إنشاء التطبيق بنجاح",
      description: "تم توليد الكود وإنشاء المعاينة",
    })
  }

  const generateCodeFromDescription = (description: string) => {
    const isTaskManager = description.includes("مهام") || description.includes("task")
    const isCalculator = description.includes("حاسبة") || description.includes("calculator")
    const isPasswordGenerator = description.includes("كلمة مرور") || description.includes("password")

    if (isTaskManager) {
      return generateTaskManagerCode()
    } else if (isCalculator) {
      return generateCalculatorCode()
    } else if (isPasswordGenerator) {
      return generatePasswordGeneratorCode()
    } else {
      return generateGenericAppCode(description)
    }
  }

  const generateTaskManagerCode = () => ({
    html: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مدير المهام</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>مدير المهام</h1>
            <p>نظم مهامك اليومية بكفاءة</p>
        </header>
        
        <div class="add-task">
            <input type="text" id="taskInput" placeholder="أضف مهمة جديدة...">
            <button onclick="addTask()">إضافة</button>
        </div>
        
        <div class="tasks-container">
            <div class="tasks-section">
                <h2>المهام المعلقة</h2>
                <ul id="pendingTasks" class="task-list"></ul>
            </div>
            
            <div class="tasks-section">
                <h2>المهام المكتملة</h2>
                <ul id="completedTasks" class="task-list completed"></ul>
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 30px;
    text-align: center;
}

header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
}

.add-task {
    padding: 30px;
    display: flex;
    gap: 15px;
}

#taskInput {
    flex: 1;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
}

#taskInput:focus {
    border-color: #ff6b6b;
}

button {
    padding: 15px 25px;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background 0.3s;
}

button:hover {
    background: #ee5a24;
}

.tasks-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding: 0 30px 30px;
}

.tasks-section h2 {
    color: #333;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f0f0f0;
}

.task-list {
    list-style: none;
}

.task-item {
    background: #f8f9fa;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s;
}

.task-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.task-text {
    flex: 1;
}

.task-actions {
    display: flex;
    gap: 10px;
}

.task-actions button {
    padding: 8px 12px;
    font-size: 14px;
}

.complete-btn {
    background: #27ae60;
}

.delete-btn {
    background: #e74c3c;
}

.completed .task-item {
    opacity: 0.7;
    background: #d5f4e6;
}

.completed .task-text {
    text-decoration: line-through;
}`,
    js: `let tasks = [];
let taskId = 0;

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('يرجى إدخال نص المهمة');
        return;
    }
    
    const task = {
        id: ++taskId,
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    input.value = '';
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }
}

function renderTasks() {
    const pendingContainer = document.getElementById('pendingTasks');
    const completedContainer = document.getElementById('completedTasks');
    
    pendingContainer.innerHTML = '';
    completedContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        
        if (task.completed) {
            completedContainer.appendChild(taskElement);
        } else {
            pendingContainer.appendChild(taskElement);
        }
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    li.innerHTML = \`
        <span class="task-text">\${task.text}</span>
        <div class="task-actions">
            <button class="\${task.completed ? 'complete-btn' : 'complete-btn'}" onclick="toggleTask(\${task.id})">
                \${task.completed ? 'إلغاء' : 'مكتمل'}
            </button>
            <button class="delete-btn" onclick="deleteTask(\${task.id})">حذف</button>
        </div>
    \`;
    
    return li;
}

// Allow Enter key to add tasks
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});`,
  })

  const generateCalculatorCode = () => ({
    html: `<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الحاسبة المتقدمة</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <input type="text" id="result" readonly placeholder="0">
        </div>
        
        <div class="buttons">
            <button class="btn clear" onclick="clearAll()">C</button>
            <button class="btn clear" onclick="clearEntry()">CE</button>
            <button class="btn operator" onclick="deleteLast()">⌫</button>
            <button class="btn operator" onclick="appendToDisplay('/')">/</button>
            
            <button class="btn number" onclick="appendToDisplay('7')">7</button>
            <button class="btn number" onclick="appendToDisplay('8')">8</button>
            <button class="btn number" onclick="appendToDisplay('9')">9</button>
            <button class="btn operator" onclick="appendToDisplay('*')">×</button>
            
            <button class="btn number" onclick="appendToDisplay('4')">4</button>
            <button class="btn number" onclick="appendToDisplay('5')">5</button>
            <button class="btn number" onclick="appendToDisplay('6')">6</button>
            <button class="btn operator" onclick="appendToDisplay('-')">-</button>
            
            <button class="btn number" onclick="appendToDisplay('1')">1</button>
            <button class="btn number" onclick="appendToDisplay('2')">2</button>
            <button class="btn number" onclick="appendToDisplay('3')">3</button>
            <button class="btn operator" onclick="appendToDisplay('+')">+</button>
            
            <button class="btn number zero" onclick="appendToDisplay('0')">0</button>
            <button class="btn number" onclick="appendToDisplay('.')">.</button>
            <button class="btn equals" onclick="calculate()">=</button>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.calculator {
    background: linear-gradient(145deg, #2c3e50, #34495e);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    width: 320px;
}

.display {
    margin-bottom: 20px;
}

#result {
    width: 100%;
    height: 80px;
    background: #1a252f;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 2em;
    text-align: right;
    padding: 0 20px;
    box-shadow: inset 0 5px 10px rgba(0,0,0,0.3);
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.btn {
    height: 60px;
    border: none;
    border-radius: 15px;
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.btn:active {
    transform: translateY(0);
}

.number {
    background: linear-gradient(145deg, #95a5a6, #7f8c8d);
    color: white;
}

.operator {
    background: linear-gradient(145deg, #e67e22, #d35400);
    color: white;
}

.equals {
    background: linear-gradient(145deg, #27ae60, #229954);
    color: white;
    grid-column: span 2;
}

.clear {
    background: linear-gradient(145deg, #e74c3c, #c0392b);
    color: white;
}

.zero {
    grid-column: span 2;
}`,
    js: `let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearAll() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

function clearEntry() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        expression = expression.replace(/×/g, '*');
        
        let result = eval(expression);
        
        if (result === Infinity || result === -Infinity) {
            display.value = 'خطأ: القسمة على صفر';
            return;
        }
        
        if (isNaN(result)) {
            display.value = 'خطأ';
            return;
        }
        
        display.value = parseFloat(result.toFixed(10));
    } catch (error) {
        display.value = 'خطأ';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});`,
  })

  const generatePasswordGeneratorCode = () => ({
    html: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مولد كلمات المرور</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🔐 مولد كلمات المرور</h1>
            <p>أنشئ كلمات مرور قوية وآمنة</p>
        </header>
        
        <div class="generator">
            <div class="options">
                <div class="option">
                    <label for="length">طول كلمة المرور:</label>
                    <input type="range" id="length" min="4" max="50" value="16">
                    <span id="lengthValue">16</span>
                </div>
                
                <div class="option">
                    <input type="checkbox" id="uppercase" checked>
                    <label for="uppercase">أحرف كبيرة (A-Z)</label>
                </div>
                
                <div class="option">
                    <input type="checkbox" id="lowercase" checked>
                    <label for="lowercase">أحرف صغيرة (a-z)</label>
                </div>
                
                <div class="option">
                    <input type="checkbox" id="numbers" checked>
                    <label for="numbers">أرقام (0-9)</label>
                </div>
                
                <div class="option">
                    <input type="checkbox" id="symbols" checked>
                    <label for="symbols">رموز (!@#$%^&*)</label>
                </div>
            </div>
            
            <button onclick="generatePassword()">توليد كلمة مرور</button>
            
            <div class="result">
                <input type="text" id="password" readonly placeholder="كلمة المرور ستظهر هنا">
                <button onclick="copyPassword()">نسخ</button>
            </div>
            
            <div class="strength">
                <div class="strength-label">قوة كلمة المرور:</div>
                <div class="strength-bar">
                    <div id="strengthIndicator" class="strength-fill"></div>
                </div>
                <div id="strengthText">ضعيف</div>
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 500px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 30px;
    text-align: center;
}

header h1 {
    font-size: 2em;
    margin-bottom: 10px;
}

.generator {
    padding: 30px;
}

.options {
    margin-bottom: 30px;
}

.option {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
}

.option label {
    flex: 1;
    font-weight: 500;
}

.option input[type="range"] {
    flex: 1;
    margin: 0 15px;
}

.option input[type="checkbox"] {
    margin-left: 15px;
    transform: scale(1.2);
}

#lengthValue {
    background: #ff6b6b;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    min-width: 30px;
    text-align: center;
}

button {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 20px;
    transition: transform 0.2s;
}

button:hover {
    transform: translateY(-2px);
}

.result {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#password {
    flex: 1;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    background: #f8f9fa;
}

.result button {
    width: auto;
    padding: 15px 20px;
    margin: 0;
}

.strength {
    text-align: center;
}

.strength-label {
    margin-bottom: 10px;
    font-weight: 600;
    color: #333;
}

.strength-bar {
    width: 100%;
    height: 10px;
    background: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
}

.strength-fill {
    height: 100%;
    transition: all 0.3s ease;
    border-radius: 5px;
}

.strength-fill.weak {
    width: 25%;
    background: #e74c3c;
}

.strength-fill.fair {
    width: 50%;
    background: #f39c12;
}

.strength-fill.good {
    width: 75%;
    background: #f1c40f;
}

.strength-fill.strong {
    width: 100%;
    background: #27ae60;
}

#strengthText {
    font-weight: 600;
    text-transform: uppercase;
}`,
    js: `const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordField = document.getElementById('password');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');

lengthSlider.addEventListener('input', function() {
    lengthValue.textContent = this.value;
});

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        alert('يرجى اختيار نوع واحد على الأقل من الأحرف');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    passwordField.value = password;
    updateStrength(password);
}

function copyPassword() {
    if (passwordField.value === '') {
        alert('يرجى توليد كلمة مرور أولاً');
        return;
    }
    
    passwordField.select();
    document.execCommand('copy');
    alert('تم نسخ كلمة المرور إلى الحافظة');
}

function updateStrength(password) {
    let score = 0;
    
    // Length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character types
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Update strength indicator
    strengthIndicator.className = 'strength-fill';
    
    if (score <= 2) {
        strengthIndicator.classList.add('weak');
        strengthText.textContent = 'ضعيف';
        strengthText.style.color = '#e74c3c';
    } else if (score <= 3) {
        strengthIndicator.classList.add('fair');
        strengthText.textContent = 'متوسط';
        strengthText.style.color = '#f39c12';
    } else if (score <= 4) {
        strengthIndicator.classList.add('good');
        strengthText.textContent = 'جيد';
        strengthText.style.color = '#f1c40f';
    } else {
        strengthIndicator.classList.add('strong');
        strengthText.textContent = 'قوي جداً';
        strengthText.style.color = '#27ae60';
    }
}

// Generate initial password
generatePassword();`,
  })

  const generateGenericAppCode = (description: string) => ({
    html: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تطبيق مخصص</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>${appName}</h1>
            <p>${description}</p>
        </header>
        
        <main>
            <div class="content">
                <p>هذا تطبيق تم إنشاؤه بناءً على وصفك. يمكنك تخصيصه أكثر حسب احتياجاتك.</p>
                <button onclick="handleAction()">تنفيذ إجراء</button>
            </div>
        </main>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 30px;
    text-align: center;
}

header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
}

main {
    padding: 40px;
}

.content {
    text-align: center;
}

button {
    padding: 15px 30px;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    margin-top: 20px;
}

button:hover {
    background: #ee5a24;
}`,
    js: `function handleAction() {
    alert('تم تنفيذ الإجراء بنجاح!');
}

console.log('تم تحميل التطبيق المخصص');`,
  })

  const createPreviewUrl = (code: { html: string; css: string; js: string }) => {
    const fullHtml = code.html
      .replace('<link rel="stylesheet" href="style.css">', `<style>${code.css}</style>`)
      .replace('<script src="script.js"></script>', `<script>${code.js}</script>`)

    return `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`
  }

  const downloadCode = (app: GeneratedApp) => {
    const zip = {
      "index.html": app.code.html,
      "style.css": app.code.css,
      "script.js": app.code.js,
    }

    // Create download for each file
    Object.entries(zip).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    })

    toast({
      title: "تم تحميل الملفات",
      description: "تم تحميل جميع ملفات التطبيق",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-red-500/30">
          <Wand2 className="w-6 h-6 text-red-400" />
          <span className="text-xl font-bold text-white arabic-title">مولد التطبيقات الذكي</span>
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto arabic-body leading-relaxed">
          اصنع تطبيقات ويب متكاملة بالذكاء الاصطناعي. اكتب فكرتك وسنحولها إلى تطبيق حقيقي
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-morphism border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white arabic-title">
                <Crown className="w-5 h-5 text-red-400" />
                تفاصيل التطبيق
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300 arabic-body">اسم التطبيق</label>
                <input
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="مثال: متجر إلكتروني، نظام إدارة..."
                  className="bg-wolf-gray border-red-500/30 text-white arabic-body"
                  style={{ direction: "rtl", textAlign: "right" }}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300 arabic-body">وصف التطبيق والميزات المطلوبة</label>
                <Textarea
                  value={appDescription}
                  onChange={(e) => setAppDescription(e.target.value)}
                  placeholder="اكتب وصفاً مفصلاً للتطبيق الذي تريد إنشاؤه، الميزات المطلوبة، نوع المستخدمين، والوظائف الأساسية..."
                  className="min-h-[120px] bg-wolf-gray border-red-500/30 text-white arabic-body resize-none"
                  style={{ direction: "rtl", textAlign: "right" }}
                />
              </div>

              {/* Framework Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300 arabic-body">إطار العمل</label>
                <div className="grid grid-cols-2 gap-3">
                  {frameworks.map((framework) => (
                    <button
                      key={framework.id}
                      onClick={() => setSelectedFramework(framework.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 text-right ${
                        selectedFramework === framework.id
                          ? "border-red-500 bg-red-500/20 text-white"
                          : "border-red-500/30 bg-wolf-gray hover:border-red-500/50 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{framework.icon}</span>
                        <div>
                          <div className="font-medium">{framework.name}</div>
                          <div className="text-xs text-gray-400 arabic-body">{framework.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300 arabic-body">نمط التصميم</label>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                        selectedStyle === style.id
                          ? "border-red-500 bg-red-500/20 text-white"
                          : "border-red-500/30 bg-wolf-gray hover:border-red-500/50 text-gray-300"
                      }`}
                    >
                      <span className="arabic-body">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generation Progress */}
          {isGenerating && (
            <Card className="glass-morphism border-yellow-500/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-yellow-400 font-medium arabic-body">جاري إنشاء التطبيق...</span>
                  </div>
                  <Progress value={generationProgress} className="h-3" />
                  <p className="text-sm text-gray-400 arabic-body">
                    {generationProgress < 100 ? `${Math.round(generationProgress)}% مكتمل` : "تم الانتهاء!"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions & Preview */}
        <div className="space-y-6">
          <Card className="glass-morphism border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white arabic-title text-center">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleGenerate}
                disabled={!appDescription.trim() || !appName.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 mystical-glow btn-enhanced arabic-body"
              >
                <Wand2 className="w-5 h-5 ml-2" />
                {isGenerating ? "جاري الإنشاء..." : "إنشاء التطبيق"}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20 arabic-body">
                  <Play className="w-4 h-4 ml-1" />
                  معاينة
                </Button>
                <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20 arabic-body">
                  <Download className="w-4 h-4 ml-1" />
                  تحميل
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="glass-morphism border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white arabic-title text-center">الميزات المتاحة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Code, text: "كود نظيف ومنظم", color: "text-blue-400" },
                { icon: Palette, text: "تصميم متجاوب", color: "text-purple-400" },
                { icon: Database, text: "قاعدة بيانات متكاملة", color: "text-green-400" },
                { icon: Globe, text: "جاهز للنشر", color: "text-yellow-400" },
                { icon: Smartphone, text: "متوافق مع الجوال", color: "text-red-400" },
                { icon: Zap, text: "أداء عالي", color: "text-orange-400" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  <span className="text-gray-300 arabic-body text-sm">{feature.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generated Apps History */}
      {generatedApps.length > 1 && (
        <Card className="glass-morphism border-red-500/20">
          <CardHeader>
            <CardTitle className="text-white">التطبيقات المُولدة مسبقاً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedApps.slice(1).map((app) => (
                <div key={app.id} className="bg-wolf-gray/30 rounded-lg p-4 border border-red-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{app.name}</h4>
                    <Badge
                      className={`text-xs ${
                        app.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : app.status === "generating"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {app.status === "completed" ? "مكتمل" : app.status === "generating" ? "جاري التوليد" : "خطأ"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{app.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-red-500/30 text-red-400">
                      <Eye className="w-3 h-3 mr-1" />
                      معاينة
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
