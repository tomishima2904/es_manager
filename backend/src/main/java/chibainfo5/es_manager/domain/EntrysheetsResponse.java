package chibainfo5.es_manager.domain;

import chibainfo5.es_manager.domain.EntrysheetsEntity;

import java.util.List;

public class EntrysheetsResponse {
    private List<EntrysheetsEntity> entrysheets;

    public EntrysheetsResponse(List<EntrysheetsEntity> entrysheets) {
        this.entrysheets = entrysheets;
    }

    public List<EntrysheetsEntity> getEntrysheets() {
        return entrysheets;
    }

    public void setEntrysheets(List<EntrysheetsEntity> entrysheets) {
        this.entrysheets = entrysheets;
    }
}

