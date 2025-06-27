
document.addEventListener('DOMContentLoaded', () => {
    // --- Check Protocol and Show Warning ---
    if (window.location.protocol === 'file:') {
        document.getElementById('warning-banner').classList.remove('hidden');
    }

    // --- DOM Elements ---
    const getEl = id => document.getElementById(id);
    const listContainer = getEl('list');
    const previewFrame = getEl('preview');
    const searchInput = getEl('search');
    const itemCountEl = getEl('itemCount');
    const paginationControls = getEl('pagination-controls');
    const exportInfoEl = getEl('export-info');

    // --- State ---
    let manifest = {};
    let fullDataset = []; // This will be populated page by page
    let currentFilteredData = [];
    let currentPageNum = 1;

    // --- Functions ---
    const escapeHtml = str => {
        const p = document.createElement('p');
        p.textContent = str || '';
        return p.innerHTML;
    };

    const injectResponsiveStyles = content => {
        const style = '<style>html,body{max-width:100%!important;overflow-x:hidden!important;padding:0!important;margin:0!important}body,.container,.wrapper,#main,.main,#page,.page{width:auto!important;min-width:0!important;max-width:100%!important;margin-left:1rem!important;margin-right:1rem!important;box-sizing:border-box!important}img,iframe,video{max-width:100%!important;height:auto!important}<\/style>';
        return content.includes('</head>') ? content.replace('</head>', style + '</head>') : style + content;
    };

    const previewFile = (fileId) => {
        const fileToDisplay = fullDataset.find(f => f.id === fileId);
        if (fileToDisplay) {
            previewFrame.srcdoc = injectResponsiveStyles(fileToDisplay.content);
            document.querySelectorAll('.list-item').forEach(el => el.classList.remove('active'));
            const activeItem = document.querySelector(`.list-item[data-id="${fileId}"]`);
            if (activeItem) activeItem.classList.add('active');
        }
    };
    
    const renderList = () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        // Filter only from the currently loaded dataset
        const dataToRender = fullDataset.filter(f => (f.title || '').toLowerCase().includes(searchTerm) || (f.content || '').toLowerCase().includes(searchTerm));

        listContainer.innerHTML = '';
        if (dataToRender.length === 0) {
            listContainer.innerHTML = '<p class="p-4 text-center text-gray-500">記事がありません。</p>';
        }

        dataToRender.forEach(f => {
            const div = document.createElement('div');
            div.className = 'list-item p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-lg border-l-4 border-transparent';
            div.dataset.id = f.id;
            div.innerHTML = \`<div class="pointer-events-none pr-2 overflow-hidden flex-grow"><h3 class="font-semibold truncate" title="${escapeHtml(f.title)}">${escapeHtml(f.title)}</h3><p class="text-sm text-gray-500">${f.date || '日付未設定'}</p></div>\`;
            listContainer.appendChild(div);
        });

        if (dataToRender.length > 0) {
            previewFile(dataToRender[0].id);
        } else {
            previewFrame.srcdoc = '';
        }

        itemCountEl.textContent = `${dataToRender.length}件表示中 / 全${manifest.totalPosts}件`;
    };

    const renderPagination = () => {
        if (manifest.dataPages <= 1) {
            paginationControls.innerHTML = '';
            return;
        }
        const prevDisabled = currentPageNum === 1 ? 'disabled' : '';
        const nextDisabled = currentPageNum === manifest.dataPages ? 'disabled' : '';
        paginationControls.innerHTML = \`
            <button id="prevPage" class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" ${prevDisabled}>前へ</button>
            <span class="text-sm font-medium">${currentPageNum} / ${manifest.dataPages}</span>
            <button id="nextPage" class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" ${nextDisabled}>次へ</button>
        \`;
        getEl('prevPage').addEventListener('click', () => { if(currentPageNum > 1) loadData(currentPageNum - 1); });
        getEl('nextPage').addEventListener('click', () => { if(currentPageNum < manifest.dataPages) loadData(currentPageNum + 1); });
    };

    const loadData = async (pageNum) => {
        listContainer.innerHTML = '<div class="flex items-center justify-center h-full"><p class="text-gray-500">ページ${pageNum}を読み込み中...</p></div>';
        try {
            const response = await fetch(`./data/data-${pageNum}.json`);
            if (!response.ok) throw new Error(`Data file for page ${pageNum} not found.`);
            fullDataset = await response.json();
            currentPageNum = pageNum;
            searchInput.value = ''; // Reset search on new page
            renderList();
            renderPagination();
        } catch(e) {
            console.error(e);
            listContainer.innerHTML = '<p class="p-4 text-red-500">記事データの読み込みに失敗しました。Webサーバー上で実行しているか確認してください。</p>';
        }
    };
    
    // --- Event Listeners ---
    searchInput.addEventListener('input', renderList);

    listContainer.addEventListener('click', event => {
        const listItem = event.target.closest('.list-item');
        if (listItem) {
            previewFile(parseInt(listItem.dataset.id, 10));
        }
    });

    // --- Initialize ---
    const init = async () => {
        try {
            const response = await fetch('./data/manifest.json');
            if (!response.ok) throw new Error('manifest.json not found.');
            manifest = await response.json();
            exportInfoEl.textContent = `エクスポート日時: ${new Date(manifest.exportedAt).toLocaleString('ja-JP')}`
            await loadData(1);
        } catch (e) {
            console.error(e);
            listContainer.innerHTML = '<p class="p-4 text-red-500">ビューワーの初期化に失敗しました。manifest.jsonが読み込めません。</p>';
        }
    };

    init();
});
