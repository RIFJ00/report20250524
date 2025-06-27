
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.protocol === 'file:') {
            document.getElementById('file-protocol-warning').classList.remove('hidden');
        }

        const getEl = id => document.getElementById(id);
        const listContainer = getEl('list');
        const previewFrame = getEl('preview');
        const searchInput = getEl('search');
        const itemCountEl = getEl('itemCount');
        const paginationControls = getEl('pagination-controls');
        const exportInfoEl = getEl('export-info');

        let manifest = {};
        let currentPageData = [];
        let allCurrentPageData = []; // For filtering
        let currentPageNum = 1;

        const loadData = async (pageNum) => {
            try {
                const response = await fetch(`./data/data-${pageNum}.json`);
                if (!response.ok) throw new Error(`Data file for page ${pageNum} not found.`);
                currentPageData = await response.json();
                allCurrentPageData = [...currentPageData]; // Store a copy for searching
                currentPageNum = pageNum;
                render();
            } catch(e) {
                console.error(e);
                listContainer.innerHTML = '<p class="p-4 text-red-500">記事データの読み込みに失敗しました。</p>';
            }
        };

        const render = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredData = searchTerm 
                ? allCurrentPageData.filter(f => (f.title || '').toLowerCase().includes(searchTerm) || (f.content || '').toLowerCase().includes(searchTerm))
                : allCurrentPageData;

            listContainer.innerHTML = '';
            if (filteredData.length === 0) {
                listContainer.innerHTML = '<p class="p-4 text-center text-gray-500">記事がありません。</p>';
            }

            filteredData.forEach(f => {
                const div = document.createElement('div');
                div.className = 'list-item p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-lg border-l-4 border-transparent';
                div.dataset.id = f.id;
                div.innerHTML = `<div class="pointer-events-none pr-2 overflow-hidden flex-grow"><h3 class="font-semibold truncate" title="${escapeHtml(f.title)}">${escapeHtml(f.title)}</h3><p class="text-sm text-gray-500">${f.date || '日付未設定'}</p></div>`;
                listContainer.appendChild(div);
            });

            if (filteredData.length > 0) {
                previewFile(filteredData[0].id);
            } else {
                previewFrame.srcdoc = '';
            }
            
            itemCountEl.textContent = `${filteredData.length} 件表示中 / 全${manifest.totalPosts}件`;
            renderPagination();
        };

        const renderPagination = () => {
            if (manifest.dataPages <= 1) {
                paginationControls.innerHTML = '';
                return;
            }
            const prevDisabled = currentPageNum === 1 ? 'disabled' : '';
            const nextDisabled = currentPageNum === manifest.dataPages ? 'disabled' : '';
            paginationControls.innerHTML = `
                <button id="prevPage" class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" ${prevDisabled}>前へ</button>
                <span class="text-sm font-medium">${currentPageNum} / ${manifest.dataPages}</span>
                <button id="nextPage" class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" ${nextDisabled}>次へ</button>
            `;
            getEl('prevPage').addEventListener('click', () => { if(currentPageNum > 1) loadData(currentPageNum - 1); });
            getEl('nextPage').addEventListener('click', () => { if(currentPageNum < manifest.dataPages) loadData(currentPageNum + 1); });
        };

        const previewFile = (fileId) => {
            const fileToDisplay = allCurrentPageData.find(f => f.id === fileId);
            if (fileToDisplay) {
                previewFrame.srcdoc = injectResponsiveStyles(fileToDisplay.content);
                document.querySelectorAll('.list-item').forEach(el => el.classList.remove('active'));
                const activeItem = document.querySelector(`.list-item[data-id="${fileId}"]`);
                if (activeItem) activeItem.classList.add('active');
            }
        };

        const escapeHtml = str => {
            const p = document.createElement('p');
            p.textContent = str || '';
            return p.innerHTML;
        };

        const injectResponsiveStyles = content => {
            const style = '<style>html,body{max-width:100%!important;overflow-x:hidden!important;padding:0!important;margin:0!important}body,.container,.wrapper,#main,.main,#page,.page{width:auto!important;min-width:0!important;max-width:100%!important;margin-left:1rem!important;margin-right:1rem!important;box-sizing:border-box!important}img,iframe,video{max-width:100%!important;height:auto!important}<\/style>';
            return content.includes('</head>') ? content.replace('</head>', style + '</head>') : style + content;
        };
        
        // Event Listeners
        searchInput.addEventListener('input', () => {
            // Re-filter and render without fetching new data
            render();
        });

        listContainer.addEventListener('click', event => {
            const listItem = event.target.closest('.list-item');
            if (listItem) {
                previewFile(parseInt(listItem.dataset.id, 10));
            }
        });

        // --- Initialize ---
        const init = async () => {
            try {
                const response = await fetch('./manifest.json');
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
    