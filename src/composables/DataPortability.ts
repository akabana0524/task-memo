export interface ExportData {
  exportDate: string;
  version: string;
  tags?: any;
  tasks?: any;
  taskHistories?: any;
  taskCategories?: any;
  backup?: any;
}

export function useDataExport() {
  function exportAllData() {
    const exportData: ExportData = {
      exportDate: new Date().toISOString(),
      version: "1.0"
    };

    // ローカルストレージから全てのデータを取得
    const keys = ['tags', 'tasks', 'taskHistories', 'taskCategories', 'backup'];

    keys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          exportData[key as keyof ExportData] = JSON.parse(data);
        } catch (e) {
          exportData[key as keyof ExportData] = data;
        }
      }
    });

    // JSONファイルとしてダウンロード
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    link.download = `task-memo-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function importAllData(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importData: ExportData = JSON.parse(content);

          // バージョンチェック（将来的な互換性のため）
          if (!importData.version) {
            if (!confirm('バージョン情報がないファイルです。インポートを続行しますか？')) {
              reject(new Error('Import cancelled'));
              return;
            }
          }

          // 確認ダイアログ
          if (!confirm('現在のデータを上書きしてインポートします。よろしいですか？')) {
            reject(new Error('Import cancelled'));
            return;
          }

          // データをローカルストレージに保存
          const keys: (keyof ExportData)[] = ['tags', 'tasks', 'taskHistories', 'taskCategories', 'backup'];

          keys.forEach(key => {
            if (importData[key]) {
              localStorage.setItem(key, JSON.stringify(importData[key]));
            }
          });

          alert('インポートが完了しました。ページをリロードします。');
          window.location.reload();
          resolve();
        } catch (error) {
          reject(error);
          alert('インポートに失敗しました。ファイル形式を確認してください。');
        }
      };

      reader.onerror = () => {
        reject(new Error('File read error'));
        alert('ファイルの読み込みに失敗しました。');
      };

      reader.readAsText(file);
    });
  }

  return {
    exportAllData,
    importAllData
  };
}
